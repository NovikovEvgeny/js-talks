class RunKitEmbed extends HTMLElement {
    constructor() {
        super();
        const wrapper = document.createElement('div');
        wrapper.style = "margin: 20pt";

        const source = this.textContent;
        this.textContent = "";
        const tempCodePlaceholder = document.createElement('pre');
        tempCodePlaceholder.textContent = source;

        window.RunKit.createNotebook({
            element: wrapper,
            source,
            onLoad: () => tempCodePlaceholder.remove()
        });
        this.appendChild(wrapper);
        this.appendChild(tempCodePlaceholder);
    }
}
customElements.define('rk-embed', RunKitEmbed);

const createCodeFn = function(oCodeFn) {
    return function(code, lang) {
        if (lang === 'js' || lang === 'javascript') {
            // rk-embed is a custom pl
            return `<rk-embed>${code.replace(/@DOCSIFY_QM@/g, '`')}</rk-embed>`
        } else {
            if (oCodeFn) {
                return oCodeFn.apply(this, arguments)
            } else {
                lang = lang || ''
                var hl = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)
                return '<pre v-pre data-lang="' + lang + '"><code class="lang-' + lang + '">' + hl + '</code></pre>'
            }
        }
    }
};




window.$docsify = window.$docsify || {};
window.$docsify.markdown = window.$docsify.markdown || {};
window.$docsify.markdown.renderer = window.$docsify.markdown.renderer || {};

window.$docsify.markdown.renderer.code = createCodeFn(window.$docsify.markdown.renderer.code);