import React,{Component} from "react";

//import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const baseUrl="http://localhost:5001/users";
const cookies = new Cookies();

export default class CreationForm extends Component{
 
    constructor(props){
        super(props);
        
        this.state = {
            form:{
                username: '',
                password: ''
            }
          };


       /* this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);*/
    }
    
    handleSubmit = async()=>{
        
        await axios.get(baseUrl, {params: {username: this.state.form.username, password: md5(this.state.form.password)}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
           
            if(response.length>0){
                var respuesta=response[0];
                console.log (respuesta);
                cookies.set('id', respuesta.id, {path: "/"});
                cookies.set('apellido', respuesta.apellido, {path: "/"});
                cookies.set('nombre', respuesta.nombre, {path: "/"});
                cookies.set('username', respuesta.username, {path: "/"});
                alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido}`);
                window.location.href="./about";
            }else{
                alert('El usuario o la contraseña no son correctos');
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    componentDidMount() {
        console.log (this.state.form.username);
       
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    logOut=()=>{
        cookies.remove('id', {path: "/create"});
        cookies.remove('apellido', {path: "/create"});
        cookies.remove('nombre', {path: "/create"});
        cookies.remove('username', {path: "/create"});
        window.location.href='./create';
    }

    render(){
        if(!cookies.get('username')){
            console.log (cookies.get('username'));
        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <label htmlFor="username">User Name</label>
                        <input
                            name="username"
                            type="text"
                            className="form-control"
                            placeholder="username"
                            onChange={this.handleChange}
                        />
                
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="password"
                            onChange={this.handleChange}
                        />

                        <button className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            </div>
        );
        }else{
            return (
                <div>
                    logeado
                    <button onClick={()=>this.logOut()}>Cerrar Sesión</button>
                </div>
            );
        }
    }
}