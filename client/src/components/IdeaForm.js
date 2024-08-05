import ideasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";

class IdeaForm{
    constructor() {
        this._formModal = document.querySelector('#form-modal');
        // start a new idealist object
        this._ideaList = new IdeaList();
    };

    addEventListener() {
        this._form.addEventListener('submit', this.handleSubmit.bind(this));
    };

    async handleSubmit(e) {
        e.preventDefault();
        // check the entries
        if(!this._form.elements.username.value || !this._form.elements.text.value || !this._form.elements.tag.value) {
            alert('Please enter all the fields');
            return;
        };
        // set the new username in the local storage
        localStorage.setItem('username', this._form.elements.username.value);
        
        const idea = {
            username: this._form.elements.username.value,
            text: this._form.elements.text.value,
            tag: this._form.elements.tag.value,
        };

        // create a new idea
        const newIdea = await ideasApi.createIdea(idea);
        // add the new idea to the ideas list
        this._ideaList.addIdeaToList(newIdea.data.result);
        // clean the form
        this._form.elements.username.value = '';
        this._form.elements.text.value = '';
        this._form.elements.tag.value = '';
        // render the form
        this.render();
        // custom event to close the form
        document.dispatchEvent(new Event('closemodal'));
    };

    render() {
        this._formModal.innerHTML = `
        <form id="idea-form">
            <div class="form-control">
                <label for="idea-text">Enter a Username</label>
                <input type="text" name="username" id="username" 
                value="${
                    localStorage.getItem('username') 
                    ?
                    localStorage.getItem('username')
                    :
                    ''
                }"/>
            </div>
            <div class="form-control">
                <label for="idea-text">What's Your Idea?</label>
                <textarea name="text" id="idea-text"></textarea>
            </div>
            <div class="form-control">
                <label for="tag">Tag</label>
                <input type="text" name="tag" id="tag" />
            </div>
            <button class="btn" type="submit" id="submit">Submit</button>
        </form>`

        this._form = document.querySelector('#idea-form');
        this.addEventListener();
    };
};

export default IdeaForm;