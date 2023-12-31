import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import {  SimplifiedNote, Tag } from "../../types/types";
import NoteCard from "../NoteCard/NoteCard";

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
};

function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filtredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} className="flex-row">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Link to="/new">
              <Button variant="outline-secondary">Edit Tags</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Title</Form.Label>
              <CreatableReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filtredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags}/>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default NoteList;
