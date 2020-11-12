import React, { Component } from 'react'
import request from 'superagent';


export default class Todos extends Component {
    state = {
        todos: [],
        todoName: '',
        completed: false,
        loading: false

    }

    componentDidMount = async () => {
        await this.fetchTodos()
    }

    fetchTodos = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request.get('https://radiant-hamlet-61264.herokuapp.com/api/todos')
            .set('Authorization', token)

        await this.setState({ todos: response.body, loading: false })
    }

    handleSubmit = async (e) => {
        const { todoName } = this.state;
        const { token } = this.props;

        e.preventDefault();

        const newTodo = {

            todo: todoName,
            completed: false,
        };

        await this.setState({ loading: true });

        await request.post('https://radiant-hamlet-61264.herokuapp.com/api/todos')
            .send(newTodo)
            .set('Authorization', token);

        await this.fetchTodos();

    }

    handleCompletedClick = async (someId) => {
        const { token } = this.props;

        await request.put(`https://radiant-hamlet-61264.herokuapp.com/api/todos/${someId}`)
            .set('Authorization', token);

        await this.fetchTodos();
    }

    render() {
        const {
            todoName,
            completed,
            loading,
            todos,
        } = this.state;

        return (
            <div>
                Welcome to the Todos!
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add a todo:
                    <input
                            value={todoName}
                            onChange={(e) => this.setState({ todoName: e.target.value })}
                        />
                    </label>
                    <label>
                        {/* Completed:
                    <input
                            //<option value={false} value={true}></option>
                            type={Boolean}
                            value={completed}

                            onChange={(e) => this.setState({ completed: e.target.value })}
                        /> */}



                    </label>
                    <button>
                        Add todo
                    </button>
                </form>
                {
                    loading
                        ? 'LOADING!!!!!'
                        : todos.map(todo => <div key={`${todo}.todo}${todo.id}${Math.random()}`} style={{
                            textDecoration: todo.completed ? 'line-through' : 'none'
                        }
                        }>
                            Todo: {todo.todo}
                            {
                                todo.completed ? '' : <button
                                    onClick={() => this.handleCompletedClick(todo.id)}>
                                    Complete Todo
                        </button>
                            }
                        </div>)
                }
            </div >
        )
    }
}









