import ideasApi from "../services/ideasApi";

class IdeaList{
    constructor() {
        this._ideaListEl = document.querySelector('#idea-list');
        this._ideas = []
        // get the ideas and render
        this.getIdeas();
        // set the valid tags
        this._validTags = new Set();
        this._validTags.add('technology');
        this._validTags.add('software');
        this._validTags.add('business');
        this._validTags.add('education');
        this._validTags.add('health');
        this._validTags.add('inventions');
    };

    addEventListener() {
        // event delegetion
        this._ideaListEl.addEventListener('click', (e) => {
            if(e.target.classList.contains('fa-times')) {
                e.stopImmediatePropagation();
                const ideaId = e.target.parentElement.parentElement.dataset.id;
                this.deleteIdea(ideaId);
            };
        });
    };

    async getIdeas() {
        try {
            const res = await ideasApi.getIdeas();
            this._ideas = res.data.result;
            this.render();
        } catch (error) {
            console.log(error);
        };
    };

    async deleteIdea(ideaId) {
        try {
            // delete from server
            const res = await ideasApi.deleteIdea(ideaId);
            // delete from the DOM
            this._ideas.filter((idea) => idea._id !== ideaId);
            this.getIdeas();
        } catch (error) {
            alert('You can not delete this resource');
        };
    };

    // add a new idea
    addIdeaToList(idea){
        this._ideas.push(idea);
        this.render();
    };

    // validate the tag
    getTagClass(tag) {
        tag = tag.toLowerCase();
        let tagClass = '';

        if(this._validTags.has(tag)) {
            tagClass = `tag-${tag}`
        } else {
            tagClass = '';
        };
        
        return tagClass;
    };

    // render the idea list components
    render() {
        this._ideaListEl.innerHTML = this._ideas.map((idea) => {
            const tagClass = this.getTagClass(idea.tag);
            // show the delete button only to the right user
            const deleteBtn = idea.username === localStorage.getItem('username') ? 
            `<button class="delete"><i class="fas fa-times"></i></button>` : '';

            return `
            <div class="card" data-id="${idea._id}">
                ${deleteBtn}
                <h3>
                    ${idea.text}
                </h3>
                <p class="tag ${tagClass}">${idea.tag.toLocaleUpperCase()}</p>
                <p>
                    Posted on <span class="date">${idea.date}</span> by
                    <span class="author">${idea.username}</span>
                </p>
            </div>` 
        }).join('');

        this.addEventListener();
    };
};

export default IdeaList;