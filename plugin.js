/**
 * TinyMCE 6 Bootstrap 4 Collapse
 */

(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
    /**
     *
     * @param editor
     * @param html
     */
    const setContent = (editor, html) => {
        editor.insertContent(html)
    };

    /**
     *
     * @param editor
     */
    const open = editor => {

        const title = editor.bootstrapCollapse.title
        const editorContent = editor.bootstrapCollapse.content
        const active = editor.bootstrapCollapse.active

        editor.windowManager.open({
            title: 'Content',
            size: 'large',
            body: {
                type: 'panel',
                items: [{
                    type: 'input',
                    label: 'Title',
                    name: 'title'
                },
                    {
                        type: 'textarea',
                        name: 'code',
                        label: 'Content'
                    },
                    {
                        type: 'checkbox',
                        name: 'active',
                        label: 'Is active',
                        enabled: true
                    }
                ]
            },
            buttons: [
                {
                    type: 'cancel',
                    name: 'cancel',
                    text: 'Cancel'
                },
                {
                    type: 'submit',
                    name: 'save',
                    text: 'Save',
                    primary: true
                }
            ],
            initialData: {code: editorContent, title: title, active: active},
            onSubmit: api => {
                if (editor.bootstrapCollapse.node) {
                    mutationNode(api, editor)
                } else {
                    setContent(editor, getHtml(api));
                }

                api.close();
            }
        });
    };
    /**
     *
     * @param editor
     */
    const setup$2 = editor => {
        editor.on('click keyup touchend', () => {
            editor.bootstrapCollapse = {
                title: '',
                content: '',
                active: false,
                node: null
            }
            const selectedNode = editor.selection.getNode();
            if (selectedNode && selectedNode.closest('.card')) {
                console.log(selectedNode);
                const elem = selectedNode.closest('.card');
                const data = {
                    title: elem.querySelector('[data-toggle="collapse"]')?.textContent,
                    content: elem.querySelector('.card-body')?.innerHTML,
                    active: elem.querySelector('.collapse.show') ? true : false,
                    node: elem,
                };
                editor.bootstrapCollapse = data;


            }
        });

        editor.on('dblclick', () => {
            const selectedNode = editor.selection.getNode();
            if (selectedNode && selectedNode.closest('.card')) {
                open(editor);
            }
        });
    }

    /**
     *
     * @param api
     * @param editor
     */
    const mutationNode = (api, editor) => {
        const accordionTitle = api.getData().title
        const accordionContent = api.getData().code
        const active = api.getData().active

        const node = editor.bootstrapCollapse.node;

        node.querySelector('[data-toggle="collapse"]').textContent = accordionTitle
        node.querySelector('.card-body').innerHTML = accordionContent
        let show = node.querySelector('.collapse');
        if (show.classList.contains('show') && active) {

        } else if (!show.classList.contains('show') && active) {
            show.classList.add('show')
        } else {
            show.classList.remove('show')
        }
    }
    /**
     *
     * @param api
     * @returns {string|*}
     */
    const getHtml = api => {
        const timestamp = new Date().getTime();

        const accordionTitle = api.getData().title
        const accordionContent = api.getData().code
        const accordionIn = api.getData().active
        return `
         <div class="card" contenteditable="false">
            <div class="card-header">         
                <a href="#collapse-${timestamp}" class="mb-0 collapsed" data-toggle="collapse"  aria-expanded="false" aria-controls="collapse${timestamp}"> ${accordionTitle} </a>
            </div>            
            <div id="collapse-${timestamp}" class="collapse ${accordionIn ? 'show' : ''}" >
                  <div class="card-body">${accordionContent}</div>
            </div>
         </div>`;

    }

    /**
     *
     * @param editor
     */
    const register$1 = editor => {
        editor.addCommand('bootstrapCollapse', () => {
            open(editor);
        });
    };

    /**
     *
     * @param editor
     */
    const register = editor => {
        editor.ui.registry.addIcon('Collapse', '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-collapse" viewBox="0 0 16 16">\n' +
            '  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793z"/>\n' +
            '</svg>');
        const onAction = () => editor.execCommand('bootstrapCollapse');
        editor.ui.registry.addButton('bootstrapCollapse', {
            icon: 'Collapse',
            tooltip: 'Bootstrap Collapse',
            onAction
        });
        editor.ui.registry.addMenuItem('bootstrapCollapse', {
            icon: 'Collapse',
            text: 'Bootstrap Collapse',
            onAction
        });
    };
    /**
     *
     * @constructor
     */
    let Plugin = () => {
        global.add('bootstrapCollapse', editor => {
            register$1(editor);
            register(editor);
            setup$2(editor);
            return {};
        });
    };
    Plugin();

})();


