import { useState } from "react"
import { useDispatch } from "react-redux"
import { plant, DAILY, MONTHLY, WEEKLY } from "../constants"
import { addHabit } from "../features/habitSlice"
import { Modal } from "react-bootstrap"
import ModalDialog from "react-bootstrap/ModalDialog"
import ModalBody from "react-bootstrap/ModalBody"
import ModalFooter from "react-bootstrap/ModalFooter"
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
            <ModalDialog>
                <ModalBody>
                    <Form className="new-habit-form" onSubmit={(e) => AddHabitHandler(e)}>
                        <button className="form__close-btn" onClick={onHide}>X</button>

                        <h4>Plant a habit!</h4>

                        <FormGroup controlId="habit-title">
                            <FormLabel>Title</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="habit title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required={true}
                                autoFocus={true}
                            />
                        </FormGroup>

                        <FormGroup controlId="habit-description">
                            <FormLabel>Description</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="habit description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required={true}
                            />
                        </FormGroup>

                        <FormGroup controlId="habit-basis">
                            <FormLabel>Plant Basis</FormLabel>
                            <FormControl
                                as="select"
                                value={basis}
                                onChange={(e) => setBasis(e.target.value)}
                                required={true}
                            >
                                <option value={DAILY}>{plant[DAILY].basis}</option>
                                <option value={WEEKLY}>{plant[WEEKLY].basis}</option>
                                <option value={MONTHLY}>{plant[MONTHLY].basis}</option>
                            </FormControl> 
                        </FormGroup>

                        <ModalFooter>
                            <button className="form__submit-btn" type="submit" onClick={(e) => AddHabitHandler(e)}>Save</button>
                            <button className="form__cancel-btn" onClick={onHide}>Cancel</button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </ModalDialog>
        </Modal>
    )
}