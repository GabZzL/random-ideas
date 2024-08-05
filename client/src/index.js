import '@fortawesome/fontawesome-free/css/all.css';
import './css/style.css';
import Modal from './components/Modal.js'
import IdeaForm from './components/IdeaForm.js';
import IdeaList from './components/IdeaList.js';

// class to displlay the modal form
new Modal();
// start the form
const ideaForm = new IdeaForm();
// start the idealist
new IdeaList()

// render the form
ideaForm.render();