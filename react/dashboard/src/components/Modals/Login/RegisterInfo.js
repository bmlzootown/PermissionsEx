import React from 'react'

import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap'

const RegisterInfo = ({ isOpen, toggle }) => (
    <div>
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>User Creation instructions</ModalHeader>
            <ModalBody>
                <p>In order to keep the dashboard secure users are registered in the dashboard_users.yml file.</p>
                <p>You can create new users by using the following format:</p>
                <pre>
                    users:<br></br>
                    &nbsp;&nbsp;YourUsername:<br></br>
                    &nbsp;&nbsp;&nbsp;&nbsp;password: YourPassword
          </pre>
                <p>After loading the file the passwords will be hashed with a salt to keep them secure in case of a
                        breach:</p>
                <pre>
                    users:<br></br>
                    &nbsp;&nbsp;YourUsername:<br></br>
                    &nbsp;&nbsp;&nbsp;&nbsp;pass_hash: $2a$10$giJkTU6RAdKpCn8wvn4i1u
          </pre>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    </div>
)

export default RegisterInfo