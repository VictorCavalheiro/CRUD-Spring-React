// MARK: React
import React, { Component } from "react";
import "./style.css";
import axios from "axios";
// MARK: Resource

export default class TableInvillia extends Component {

	constructor(props) {
		super(props);
		this.state = {
			students: []
		}
        this.insertStudent = this.insertStudent.bind(this);
        this.removeStudent = this.removeStudent.bind(this);
        this.updateStudent = this.updateStudent.bind(this);
	}

	async insertStudent(e){
        e.preventDefault();
        const age = document.getElementById("age").value;
        const name = document.getElementById("name").value;
		await axios.post(`http://localhost:8080/api/student`, {
                    age:age,
                    name:name
                });
        const allStudents = await axios.get(`http://localhost:8080/api/students`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
        });
        this.setState({students:allStudents.data});
		this.renderTableData();
	}

	async componentDidMount() {
		const allStudents = await axios.get(`http://localhost:8080/api/students`, {
			headers: {
				"Content-Type": "application/json"
			}
		});
		this.setState({ students: allStudents.data });

    }

    async updateStudent(e){
        const targetStudent = await axios.get(`http://localhost:8080/api/student/${e.target.id}`, {
			headers: {
				"Content-Type": "application/json"
			}
        });
        await axios.put(`http://localhost:8080/api/student`, {
                    id:targetStudent.data.id,
                    age:targetStudent.data.age+1,
                    name:targetStudent.data.name
                });

        const allStudents = await axios.get(`http://localhost:8080/api/students`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
        });
        this.setState({ students: allStudents.data });
        this.renderTableData();
    }

    async removeStudent(e){
        const targetStudent = await axios.get(`http://localhost:8080/api/student/${e.target.id}`, {
			headers: {
				"Content-Type": "application/json"
			}
        });
        await axios.put(`http://localhost:8080/api/student/delete`,{
                id:targetStudent.data.id,
                age:targetStudent.data.age,
                name:targetStudent.data.name

        });
        const allStudents = await axios.get(`http://localhost:8080/api/students`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
        });
        this.setState({ students: allStudents.data });
        this.renderTableData();
    }

	renderTableData() {
		return this.state.students.map((student, index) => {
			const { id, name, age } = student //destructuring
			return (
				<tr key={id}>
					<td>{id}</td>
					<td>{age}</td>
					<td>{name}</td>
					<button id={id} onClick={this.removeStudent}>EXCLUIR</button>
                    <button id={id} onClick={this.updateStudent}>UPDATE AGE</button>
				</tr>
			)
		})
    }

	render() {
		return (
			<div>
				<table id='students'>
                    <thead>
                        <th>ID</th>
                        <th>AGE</th>
                        <th>NAME</th>
                    </thead>
					<tbody>
						{this.renderTableData()}
					</tbody>
				</table>

                <h1>INSERT FORM</h1>
				<form>
					<label>
						Age:
    				<input required type="text" name="name" id="age" />
					</label>
					<label>
						Name:
    				<input required="true" type="text" name="name" id="name" />
					</label>
					<button type="button" onClick={this.insertStudent} value="Inserir">Inserir</button>
				</form>
			</div>
		);
	}
}