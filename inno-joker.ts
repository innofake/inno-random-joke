import { LitElement, html, nothing, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('inno-joker')
export class InnoJoker extends LitElement {

    @state()
    _joke = null;

    override connectedCallback() {
        super.connectedCallback();
        this._getJoke();
    }

    private _getJoke() {

        fetch('https://v2.jokeapi.dev/joke/Programming?type=single&safe-mode')
            .then(response => response.json())
            .then(data => {
                this._joke = data.joke;
            });
    }

    static override styles = css`
    
        div {
            font-family: var(--inno-random-joke-font-family, Arial);
            font-size: var(--inno-random-joke-font-size, 12px);
            font-weight: var(--inno-random-joke-font-weight, normal);
            text-transform: uppercase;
            text-decoration: underline;
        }
    `;

    override render() {

        return this._joke
            ? html`<div>${this._joke}</div>`
            : nothing;
    }
}