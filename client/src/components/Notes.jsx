import React, { useState, useEffect } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import styled, { keyframes } from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip';
import NoteForm from './NoteForm'
import LinearProgress from '@material-ui/core/LinearProgress';

const query = gql`
  query{
    notes(filters:{}){
      _id
      title
      tags
      mainContent
      creationDate
  }
  }`

const deleteQuery = gql`
    mutation deleteNotes($id: String!) {
        deleteNote(_id: $id) {
            title
        }
      
  }`

  const addNoteQuery = gql`
    mutation AddNote(
        $creationDate:String!,
        $mainContent:String!,
        $tags:[String!]!,
        $title:String!,
    ){
        createNote(payload: {
            creationDate: $creationDate,
            mainContent: $mainContent,
            tags: $tags,
            title: $title,
            }) {
            title
            }
  }`

const Title = styled.p`
    height: 50px;
    line-height: 50px;
    display: block;
    text-align: center;
    margin: 0px auto;
    font-size: 40px;
    letter-spacing: 5px;
    font-weight: 300;
    text-transform: uppercase;
    position: -webkit-sticky;
    position: sticky;
    top: 10px;
    -webkit-transition: 0.2s ease-in-out;
    -o-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
  `;

const TitleWrapper = styled.div`
    width: 100%;
    height: 250px;
    background: -o-linear-gradient(left, #36d7b7, #2b303b); background: linear-gradient(90deg, #36d7b7, #2b303b);
    color: #fff;
    display: flex;
    align-items: center;
    z-index: 1000;
`

const NoteContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    min-width: 300px;
    width: 80%;
    margin: 0 auto;
    background: #fff;
`
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Note = styled.div`
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border: 0.5px solid #e2e2e2;
    box-shadow: 1px 1px 1px #e2e2e2;
    width: 250px;
    height: 250px;
    margin: 30px;
    font-size: 18px;
    letter-spacing: 1px;
    position: relative;
    background: cadetblue;
`

const Loader = styled.div`
  animation: ${rotate360} 1s linear infinite;
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  position: fixed;
    top: 50%;
    left:50%;
transform: translate(-50%, -50%);
`;

const SearchNote = styled.div`
color: #fff;
display: flex;
align-items: center;
cursor: pointer;
background: #2b303b;
    padding: 16px 32px;
    font-size: 20px;
    font-family: Courier New, Courier, monospace;
    opacity: 0.9;
    width: 60%;
    margin: 25px auto;
`


const SearchBar = styled.input`
padding: 10px;
height:15px;
width: 100%;
`

const Button = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width:100%;
  &:hover {
      color: black;
    }
`;


const CreateNoteBtn = styled.button`
  background: ${props => props.primary ? "palevioletred" : "black"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width:100%;

    cursor:pointer;
  &:hover {
      color: aquamarine;
      background-color:black;
    }
`;

const NoteElem = styled.p`
    background: aquamarine;
    border-radius: 7px;
    padding: 3px;
    margin: 5px;
`

const Alert = styled.div`
    position:fixed;
    top: 50%;
    left: 50%;
transform: translate(-50%, -50%);
padding:50px;
background-color:aquamarine;

font-size: 20px;
    font-family: Courier New, Courier, monospace;
    
`
const style = {
    borderRadius: 0,
    opacity: 0.7,
    padding: '2em',
}


export default function Notes() {
    const { loading, data } = useQuery(query);
    console.log(data)
    const [deleteNotes, { loading: deleting, error: deleteError }] = useMutation(deleteQuery, {
        refetchQueries: [{ query: query }],
        awaitRefetchQueries: true,
    });
    const [AddNote] = useMutation(addNoteQuery, {
        refetchQueries: [{ query: query }],
        awaitRefetchQueries: true,
    });
    
    let [color, setColor] = useState("#ffffff");
    const [noteData, setNoteData] = useState("")
    const [noteFormOpen, setNoteForm] = useState(false)

    useEffect(() => {

        if (data) {
            setNoteData(data)
        }

    }, [data])

    const searchNote = (e) => {
        let newNoteData = noteData.notes.filter(note => note.tags.includes(e.target.value))

        if (newNoteData.length) {
            setNoteData({
                notes: newNoteData
            })
            console.log(newNoteData)
        } else {
            setNoteData(data)
        }
    }

    const deleteNote = (noteid) => {
        // alert(noteid)
        deleteNotes({
            variables: { id: noteid },
        })
        // setNoteData(data)
    }

    const handleSaveClose = (values) => {
        console.log(values)
        AddNote({
            variables: {   creationDate:values.date,
                mainContent:values.maincontent,
                tags:values.tags,
                title:values.title},
        })
        closeForm()
    }

    const createNote = () => {
        setNoteForm(true)
    }

    const closeForm=()=>{
        setNoteForm(false)

    }

    return (
        <>
            {
                loading ?
                    <Loader />
                    :
                    <>
                        {
                            noteData.notes &&
                            <>
                                <TitleWrapper>
                                    <Title>
                                        Note's List
                        </Title>
                                </TitleWrapper>
                                <SearchNote>
                                    <CreateNoteBtn onClick={createNote}>New Note</CreateNoteBtn>
                                    <Tooltip title="Search Note By Tags">
                                        <SearchBar type="text" placeholder="Search Note By Tags  Ex: hello" onChange={searchNote} />
                                    </Tooltip>
                                </SearchNote>
                                <NoteContainer>
                                    {
                                        noteData.notes.map(note => {
                                            let tagsStr = note.tags.join(', ')
                                            console.log(tagsStr)
                                            return (
                                                <Note key={note._id}>
                                                    <NoteElem>Title: {note.title}</NoteElem>
                                                    <NoteElem>Content: {note.mainContent}</NoteElem>
                                                    <NoteElem>Tags: {tagsStr}</NoteElem>
                                                    <NoteElem>Creation Date {note.creationDate}</NoteElem>
                                                    <Button onClick={() => deleteNote(note._id)}>Delete</Button>
                                                </Note>
                                            )
                                        })
                                    }
                                </NoteContainer>
                            </>
                        }
                        {
                            !noteData.notes &&
                            <Alert>
                            Connection Lost With Server !
                            </Alert>
                        }
                    </>
            }

            <NoteForm open={noteFormOpen} handleClose={closeForm} handleSaveClose={handleSaveClose}/>
        </>
    )
}
