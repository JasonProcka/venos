import React from 'react'
import { Link } from 'react-router'
export default React.createClass({
  render() {
    return <div className="hub">
<div class="hub-jumbo jumbo-nonav">
    <div class="max-width">
        <div class="jumbo-content">
            <div class="jumbo-info">
                <h3 class="jumbo-title">Mr. Procka's English 12</h3>
                <p class="jumbo-description">Drop your recent slideshows here!</p>
            </div>
            <div class="jumbo-buttons">
                <a class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent create-drop">
                    Create Drop
                </a>
                <button id="link-copier" class="mdl-button mdl-js-button mdl-js-ripple-effect" style="color: #FFF;">
                    Copy Link
                </button>
            </div>
        </div>
        <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <header class="mdl-layout__header">
            <div class="mdl-layout__tab-bar">
                <a href="#scroll-tab-1" class="mdl-layout__tab is-active">Drops</a>
                <a href="#scroll-tab-2" class="mdl-layout__tab">Bio</a>
            </div>
          </header>
          <main class="mdl-layout__content">
            <section class="mdl-layout__tab-panel is-active" id="scroll-tab-1">
              <div class="page-content"></div>
            </section>
            <section class="mdl-layout__tab-panel" id="scroll-tab-2">
              <div class="page-content"></div>
            </section>
          </main>
        </div>
    </div>
</div>
<div class="dropzonecontainer shadow-light">
    <div class="closecontainer">
        <h4>Create Drop</h4>
        <span class="closeadddrop"><i class="material-icons">close</i></span>    
    </div>
    <form action="/file-upload"
        class="dropzone createdropzone">
        <span class="dz-message"><h4>Drag & Drop</h4><p>your files, or click anywhere</p></span>
    </form>
</div>
<div class="lower-content">
    <div class="sub-content">
        <div class="hub-grid grid-full">
            <div class="col-4">
                <div class="col">
                    <div class="hub-card demo-card-image mdl-card shadow-light">
                        <div class="mdl-card__title mdl-card--expand"></div>
                        <div class="mdl-card__actions">
                            <span class="demo-card-image__filename">Desert-Night-Desktop-Wallpaper.png</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col">
                    <div class="hub-card demo-card-image mdl-card shadow-light">
                        <div class="mdl-card__title mdl-card--expand"></div>
                        <div class="mdl-card__actions">
                            <span class="demo-card-image__filename">write_illustration.png</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col">
                    <div class="hub-card demo-card-image mdl-card shadow-light">
                        <div class="mdl-card__title mdl-card--expand"></div>
                        <div class="mdl-card__actions">
                            <span class="demo-card-image__filename">Screen Shot 2016-10-07 at 6.53.59 PM</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col">
                    <div class="hub-card demo-card-image mdl-card shadow-light">
                        <div class="mdl-card__title mdl-card--expand"></div>
                        <div class="mdl-card__actions">
                            <span class="demo-card-image__filename">nlenvirte_1031.pdf</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col">
                    <div class="hub-card demo-card-image mdl-card shadow-light">
                        <div class="mdl-card__title mdl-card--expand"></div>
                        <div class="mdl-card__actions">
                            <span class="demo-card-image__filename">Desert-Night-Desktop-Wallpaper.png</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col">
                    <div class="hub-card demo-card-image mdl-card shadow-light">
                        <div class="mdl-card__title mdl-card--expand"></div>
                        <div class="mdl-card__actions">
                            <span class="demo-card-image__filename">lPchzq.png</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<footer class="mdl-mini-footer">
  <div class="mdl-mini-footer__left-section">
    <ul class="mdl-mini-footer__link-list">
        <li><a href="#">Our Mission</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Help</a></li>
        <li><a href="#">Privacy & Terms</a></li>
        <li><a href="#">Contact</a></li>
    </ul>
  </div>
</footer>
<div class="overlay"></div>
<div class="drop-theater-overlay"></div>
</div>
  }
})