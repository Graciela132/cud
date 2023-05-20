import React, {useState} from "react";
import {Table, Button, Row} from 'reactstrap';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import './estilosAlumnos.css'

const Alumnos = (props) => {
    //hook para la visualizacion del formulario
    const [isVisible, setIsVisible] = useState(false);
    //hooks para los datos del alumno
    const [matricula, setMatricula] = useState("");
    const [nombre, setNombre] = useState("");
    const [carrera, setCarrera] = useState("Ingenieria Civil");
    const [imagen, setImagen] = useState("");
    //hook Arreglo para el listado de alumnos
    const [Alumnos, setAlumnos] = useState([])  //lista vacia


    //variable del estado inicial de formulario(indicador de guardar)
    const estadoInicial = {botonF:'GUARDAR', alumno:{},indice:-1,titulo:''}
    //hook para estado del formulario
    const [estado,setEstado] = useState(estadoInicial)


    const guardar = (event) => {
        event.preventDefault();
        if (estado.botonF==="GUARDAR"){
            setAlumnos([...Alumnos, {matricula,nombre,carrera,imagen}])
            setMatricula('')
            setNombre('')
        }else if (estado.botonF==="Editar"){
            const aux =[...Alumnos]
            aux[estado.indice]={matricula,nombre,carrera,imagen}
            setAlumnos(aux)
            setEstado(estadoInicial)
            setMatricula('')
            setNombre('')
        }

    };



    const vistaFormu = () => {
        setIsVisible(!isVisible); //hook con funcionamiendo de bandera
    }


    //evento que cuando ingrese matricula se va a mandar lo que se halla secrito
    const eventoMatricula = (event) => {
        setMatricula(event.target.value)
    }
    const eventoNombre = (event) => {
        setNombre(event.target.value)
    }
    const eventoCarrera = (event) => {
        setCarrera(event.target.value)
    }

    //evento que recibe la imagen y despues la convierte en un onjeto temporal
    //accesible desde una URL
    const eventoImagen = (event) => {
        const file = event.target.files[0]; //e.t file arreglo de archivos
        const url = URL.createObjectURL(file)
        setImagen(url)
    }

    const onEdit = (alum,index) => {
        setEstado({botonF:'Editar', alumno:{},indice:index,titulo: 'Editar Alumno'})
        setMatricula(alum.matricula)
        setNombre(alum.nombre)
        setCarrera(alum.carrera)
      
    }

    const onBorrar = (i) => {
        setAlumnos(Alumnos.filter((_,id)=>id!==i))
      
    }

    return <>

        <Row>
            <h2 className="titulo">REGISTRO ALUMNOS </h2>
            <Button color="primary" onClick={vistaFormu}>Agregar Alumno</Button>
            {isVisible && (
                <Form onSubmit={guardar}>
                    <h2>{estado.titulo}</h2>
                    <FormGroup>
                        <Label>
                            MATRICULA:
                            <Input //Input T mayuscula pertenece a la libreria de Reac strap
                                //
                                type="text" //tipo input = texto
                                value={matricula} //valor va a ser en cado de la edicion del alumno
                                onChange={eventoMatricula} //metodo en caso de ingrrse un valor
                                required={true} //
                            />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            NOMBRE:
                            <Input
                                type="text"
                                value={nombre}
                                onChange={eventoNombre}
                                required={true}
                            />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            CARRERA:
                            <Input
                                type="select"
                                required={true}
                                value={carrera}
                                onChange={eventoCarrera}
                            >
                                <option value="Ingeniería Civil">Ingeniería Civil</option>
                                <option value="Ingeniería Electrica">Ingeniería Electrica</option>
                                <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                                <option value="Ingeniería Mecatrónica">Ingeniería Mecatrónica</option>
                                <option value="Ingeniería Química">Ingeniería Química</option>
                                <option value="Ingenieria Logistica">Ingeniería Logistica</option>
                                <option value="Ingeniería en Sistemas Computacionales">Ingeniería en Sistemas
                                    Computacionales
                                </option>
                                <option value="Licenciatura en Administración">Licenciatura en Administración</option>
                                <option value="Ingeniería en Tecnologias de la Información y Comunicaciones">Ingeniería en
                                    Tecnologias de la Información y Comunicaciones
                                </option>
                            </Input>
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for="foto">FOTO:</Label>
                        <Input
                            type="file"
                            name="foto"
                            id="foto"
                            onChange={eventoImagen}
                            required={true}
                        />
                    </FormGroup>
                    <Button type="submit" color="primary" className="botong">{estado.botonF}</Button>
                </Form>
            )}

            <Table class="table table-striped" >
                <thead className="table-primary">
                <tr>
                    <th>MATRICULA</th>
                    <th>NOMBRE</th>
                    <th>CARRERA</th>
                    <th>FOTO</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {Alumnos.map((alumno,i)=>(
                    <tr key={i}>
                        <td>{alumno.matricula}</td>
                        <td>{alumno.nombre}</td>
                        <td>{alumno.carrera}</td>
                        <td>
                            <img src={alumno.imagen} className="imagen"/>

                        </td>
                        <td>
                            <Button color="primary" className="boton1" onClick={() => onEdit(alumno,i)}>Editar</Button>
                            <Button color="primary" onClick={() => onBorrar(i)}>Eliminar</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Row>
    </>;
}

export default Alumnos;
