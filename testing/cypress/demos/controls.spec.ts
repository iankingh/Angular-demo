import qrCode from '../fixtures/qr-code.json';

describe('QR scanner controls', () => {
  it('decodes a synthetic camera, switches devices, controls torch and stops tracks', () => {
    const tracks: MediaStreamTrack[] = [];

    cy.visit('http://localhost:4202/qr-code-scanner', {
      onBeforeLoad(win) {
        cy.stub(win.navigator.mediaDevices, 'enumerateDevices').resolves(
          ['cam-1', 'cam-2'].map((deviceId) => ({
            deviceId,
            label: deviceId,
            kind: 'videoinput',
            groupId: 'synthetic-camera',
          })),
        );
        cy.stub(win.navigator.mediaDevices, 'getUserMedia')
          .callsFake(() => {
            const canvas = win.document.createElement('canvas');
            canvas.width = canvas.height = qrCode.rows.length * 10;
            const context = canvas.getContext('2d')!;
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = 'black';
            qrCode.rows.forEach((row, y) => {
              [...row].forEach((value, x) => {
                if (value === '1') {
                  context.fillRect(x * 10, y * 10, 10, 10);
                }
              });
            });
            const stream = canvas.captureStream(10);
            const track = stream.getVideoTracks()[0];
            cy.stub(track, 'getCapabilities').returns({ torch: true } as MediaTrackCapabilities);
            cy.stub(track, 'applyConstraints').as('torchConstraints').resolves();
            tracks.push(track);
            return Promise.resolve(stream);
          })
          .as('camera');
      },
    });

    cy.contains('button', 'Torch: off').should('be.disabled');
    cy.contains('button', 'Try harder: off').click();
    cy.contains('button', 'Try harder: on').should('be.visible');
    cy.contains('button', 'Start').click();
    cy.get('output.result').should('contain', qrCode.text);
    cy.get('video').should(($video) => {
      expect(($video[0] as HTMLVideoElement).srcObject).not.to.equal(null);
    });
    cy.contains('button', 'Torch: off').should('be.enabled').click();
    cy.get('@torchConstraints').should('have.been.calledWith', {
      advanced: [{ fillLightMode: 'flash', torch: true }],
    });
    cy.contains('button', 'Torch: on').click();
    cy.get('@torchConstraints').should('have.been.calledWith', {
      advanced: [{ fillLightMode: 'off', torch: false }],
    });

    cy.get('select').select('cam-2');
    cy.get('@camera').should('have.been.calledTwice');
    cy.then(() => expect(tracks[0].readyState).to.equal('ended'));
    cy.get('select').should('have.value', 'cam-2');
    cy.contains('button', 'Stop').click();
    cy.then(() => expect(tracks[1].readyState).to.equal('ended'));
    cy.get('video').should(($video) => {
      expect(($video[0] as HTMLVideoElement).srcObject).to.equal(null);
    });
    cy.contains('button', 'Torch: off').should('be.disabled');
    cy.contains('button', 'Clear result').click();
    cy.get('output.result').should('not.exist');

    cy.contains('button', 'Start').click();
    cy.get('@camera').should('have.been.calledThrice');
    cy.get('output.result').should('contain', qrCode.text);
    cy.contains('a', 'Home').click();
    cy.then(() => expect(tracks[2].readyState).to.equal('ended'));
  });

  it('shows permission denial without leaving the controls active', () => {
    cy.visit('http://localhost:4202/qr-code-scanner', {
      onBeforeLoad(win) {
        cy.stub(win.navigator.mediaDevices, 'enumerateDevices').resolves([
          { deviceId: 'denied-camera', label: 'Denied', kind: 'videoinput' },
        ]);
        cy.stub(win.navigator.mediaDevices, 'getUserMedia').rejects(
          new Error('Camera permission denied'),
        );
      },
    });
    cy.contains('button', 'Start').click();
    cy.get('.error').should('contain', 'Camera permission denied or unavailable.');
    cy.contains('button', 'Start').should('be.visible');
    cy.contains('button', 'Torch: off').should('be.disabled');
  });
});

describe('Material icons', () => {
  it('renders the four named ligatures with the loaded Material Icons font', () => {
    cy.visit('http://localhost:4203/icons-and-slider');
    cy.get('mat-icon')
      .should('have.length', 4)
      .then(($icons) => {
        expect([...$icons].map((icon) => icon.textContent?.trim())).to.deep.equal([
          'person',
          'thumb_up',
          'info',
          'warning',
        ]);
      });
    cy.get('link[href="https://fonts.googleapis.com/icon?family=Material+Icons"]').should('exist');
    cy.document()
      .then((document) => document.fonts.load('24px "Material Icons"'))
      .then((fonts) => {
        expect(fonts).to.have.length(1);
        expect(fonts[0].status).to.equal('loaded');
      });
    cy.get('mat-icon').first().should('have.css', 'font-family', '"Material Icons"');
  });
});

describe('Navigation loading', () => {
  it('shows the spinner during the resolver and clears it after navigation and same-URL clicks', () => {
    cy.visit('http://localhost:4204/loading/page-a');
    cy.get('app-loading-demo').should('contain', 'page-a works!');
    cy.get('[role="status"]').should('not.exist');
    cy.contains('app-loading-demo a', 'Page B').click();
    cy.get('[role="status"]').should('be.visible');
    cy.get('app-loading-demo').should('contain', 'page-b works!');
    cy.get('[role="status"]').should('not.exist');
    cy.contains('app-loading-demo a', 'Page B').click();
    cy.get('[role="status"]').should('not.exist');
    cy.contains('app-loading-demo a', 'Page A').click();
    cy.get('[role="status"]').should('be.visible');
    cy.get('app-loading-demo').should('contain', 'page-a works!');
    cy.get('[role="status"]').should('not.exist');
  });
});
