import { Col, FormControl, FormGroup, FormLabel, Modal, Row } from "react-bootstrap"
import { growth, plant } from "../constants"
import { useDispatch } from "react-redux"
import { deleteHabit } from "../features/habitSlice"


export default function HabitDetails({ show, onHide, habit }) {
    const dispatch = useDispatch()
    const deleteHabitHandler = (title) => {
        dispatch(deleteHabit(title))
    }
    return(
        <Modal className="habit-details" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{habit.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="habit-details__body">
                <p className="habit-details__item">{habit.description}</p>
                <FormGroup className="habit-details__item" as={Row}>
                    <FormLabel column sm={4}>Points</FormLabel>
                    <Col>
                        <FormControl
                            type="number"
                            readOnly={true}
                            value={habit.points}>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup className="habit-details__item" as={Row}>
                    <FormLabel column sm={4}>Basis</FormLabel>
                    <Col>
                        <FormControl
                            type="text"
                            readOnly={true}
                            value={plant[habit.plant.basis].basis}
                            >
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup className="habit-details__item" as={Row}>
                    <FormLabel column sm={4}>Current Stage</FormLabel>
                    <Col>
                        <FormControl
                            type="text"
                            readOnly={true}
                            value={`${growth[habit.plant.stage].emoji}  ${growth[habit.plant.stage].stage}`}
                            >
                        </FormControl>
                    </Col>
                </FormGroup>
            </Modal.Body>
            <Modal.Footer className="habit-details__footer">
                <button className="habit-delete" onClick={() => deleteHabitHandler(habit.title)}>Delete</button>
            </Modal.Footer>
        </Modal>
    )
}