import { expect } from 'chai';
import documentReducer from '../../src/reducers/document';

const initialDocument = [
  {
    id: 9,
    title: 'Abiku-1',
    content: 'In vain your bangles cast, charms circle at your feet'
  },
  {
    id: 11,
    title: 'Abiku-2',
    content: 'Coming and going these several seasons Do stay'
  },
  {
    id: 13,
    title: 'class-23',
    content: 'the best class ever'

  }
];

const initialState = {
  documents: initialDocument,
  documentDetails: false,
  editMode: false
};
let currentState;

describe('Document reducer', () => {
  it('should return the initial state as the default case', () => {
    expect(documentReducer({}, [])).to.eql({});
  });

  it(`should load all documents in the store and
       return the state with all documents`, () => {
    const documents = [
      { id: 5,
        title: 'butterfly',
        content: 'to pimp a butterfly' },
      { id: 6, title: 'eyez', content: 'for your eyes only' }
    ];

    const action = { type: 'LOAD_DOCUMENT', documents };
    currentState = documentReducer(initialState, action);
    expect(currentState.documents).to.have.length(2);
    expect(currentState.documents[0].content).to.eql('to pimp a butterfly');
  });

  it('should add created document to state', () => {
    const document = {
      id: 4,
      title: 'ALL-A B',
      content: 'for my people by badass'
    };
    const action = { type: 'CREATE_DOCUMENT', document };
    currentState = documentReducer(initialState, action);
    expect(currentState.documents[3].title).to.eql('ALL-A B');
    expect(currentState.documents[0].title).to.eql('Abiku-1');
    expect(currentState.documentDetails).to.eql(false);
  });

  it('should update state upon delete', () => {
    expect(currentState.documents).to.have.length(4);
    const action = { type: 'DELETE_DOCUMENT', id: 9 };
    currentState = documentReducer(initialState, action);
    expect(currentState.documents).to.have.length(3);
  });

  it('should update state on updates on document', () => {
    const document = {
      id: 13,
      title: 'class-23',
      content: 'They picked Akanni up one morning Beat him soft like'
    };
    const action = { type: 'EDIT_DOCUMENT', document };
    currentState = documentReducer(initialDocument, action);
    expect(currentState.editMode).to.eql(true);
    expect(currentState.document.id).to.eql(13);
  });
});
