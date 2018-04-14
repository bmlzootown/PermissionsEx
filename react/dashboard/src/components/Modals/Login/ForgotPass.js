import React from 'react'

import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap'

const Login_ForgotPass = ({ isOpen, toggle }) =>
    (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Password Replacement instructions</ModalHeader>
                <ModalBody>
                    <p>You can replace a password in the dashboard_users.yml file the same way you create a new user.</p>
                    <p>Add a new password for the user:</p>
                    <pre>
                        users:<br></br>
                        {'  '}YourUsername:<br></br>
                        {'    '}pass_hash: $2a$10$giJkTU6RAdKpCn8wvn4i1u<br></br>
                        {'    '}password: NewPassword
              </pre>
                    <p>After loading the file, the new password will be hashed.</p>
                    <pre>
                        users:<br></br>
                        {'  '}YourUsername:<br></br>
                        {'    '}pass_hash: $2a$10$hjYdQfkLoSiYeZKXZ9Gqgu
              </pre>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    )

export default Login_ForgotPass