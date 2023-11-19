import { useState } from "react"
import { useDispatch } from "react-redux"
import { plant, DAILY, MONTHLY, WEEKLY } from "../constants"
import { addHabit } from "../features/habitSlice"
import { Col, Modal, Row } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import FormGroup from "react-bootstrap/FormGroup"
import FormLabel from "react-bootstrap/FormLabel"
import FormControl from "react-bootstrap/FormControl"

export default function NewHabit({ show, onHide }) {
    const dispatch = useDispatch()

    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ basis, setBasis ] = useState(DAILY)

    // handle new habits
    const AddHabitHandler = (e) => {
        e.preventDefault()
        dispatch(addHabit({ title, description, basis }))
        onHide()
    }

    return (
        
        <Modal className="new-habit-dialog" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>New Habit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="new-habit-form" onSubmit={(e) => AddHabitHandler(e)}>

                    <p className="habit-details__item">Plant a habit!</p>

                    <FormGroup controlId="habit-title" className="habit-details__item" as={Row}>
                        <FormLabel column sm={4}>Title</FormLabel>
                        <Col>
                            <FormControl
                                type="text"
                                placeholder="habit title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required={true}
                                autoFocus={true}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="habit-description" className="habit-details__item" as={Row}>
                        <FormLabel column sm={4}>Description</FormLabel>
                        <Col>
                            <FormControl
                                type="text"
                                placeholder="habit description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required={true}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="habit-basis" className="habit-details__item" as={Row}>
                        <FormLabel column sm={4}>Plant Basis</FormLabel>
                        <Col>
                            <FormControl
                                as="select"
                                value={basis}
                                onChange={(e) => setBasis(e.target.value)}
                                required={true}>
                                <option value={DAILY}>{plant[DAILY].basis}</option>
                                <option value={WEEKLY}>{plant[WEEKLY].basis}</option>
                                <option value={MONTHLY}>{plant[MONTHLY].basis}</option>
                            </FormControl> 
                        </Col>
                    </FormGroup>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button className="form__cancel-btn" onClick={onHide}>Cancel</button>
                <button className="form__submit-btn" type="submit" onClick={(e) => AddHabitHandler(e)}>Save</button>
            </Modal.Footer>
        </Modal>
    )
}