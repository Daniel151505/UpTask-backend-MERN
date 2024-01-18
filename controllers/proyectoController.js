import Proyecto from "../models/Proyecto.js";
import Usuario from "../models/Usuario.js";

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find()
    .where("creador")
    .equals(req.usuario)
    .select("-tareas");
  res.json(proyectos);
};

const nuevoProyecto = async (req, res) => {
  delete req.body.id;
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findById(id).populate("tareas").populate("colaboradores", 'nombre email');

  if (!proyecto) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción No Válida");
    return res.status(401).json({ msg: error.message });
  }

  res.json(proyecto);
};

const editarProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción No Válida");
    return res.status(401).json({ msg: error.message });
  }

  proyecto.nombre = req.body.nombre || proyecto.nombre;
  proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
  proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
  proyecto.cliente = req.body.cliente || proyecto.cliente;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción No Válida");
    return res.status(401).json({ msg: error.message });
  }

  try {
    await proyecto.deleteOne();
    res.json({ msg: "Proyecto Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

const searchCollaborator = async (req, res) => {
  const { email } = req.body;
  const user = await Usuario.findOne({ email }).select(
    "-confirmado -createdAt -password -token -updatedAt -__v "
  );

  if (!user) {
    const error = new Error("User not found");
    return res.status(404).json({ msg: error.message });
  }

  res.json(user);
};

const agregarColaborador = async (req, res) => {
  const project = await Proyecto.findById(req.params.id);

  if (!project) {
    const error = new Error("Project Not Found");
    return res.status(404).json({msg: error.message})
  }

  if (project.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Invalid Action");
    return res.status(404).json({msg: error.message})
  }

  const { email } = req.body;
  const user = await Usuario.findOne({ email }).select(
    "-confirmado -createdAt -password -token -updatedAt -__v "
  );

  if (!user) {
    const error = new Error("User not found");
    return res.status(404).json({ msg: error.message });
  }

  // The collaborator is not the admin of the project
  if(project.creador.toString() === user._id.toString()) {
    const error = new Error("The project creator cannot be a collaborator");
    return res.status(404).json({msg: error.message})
  }

  // Check that it is not already added to the project
  if(project.colaboradores.includes(user._id)) {
    const error = new Error("The user already belongs to the project");
    return res.status(404).json({msg: error.message})
  }

  // Is Ok, can be added
  project.colaboradores.push(user._id)
  await project.save()
  res.json({msg: "Collaborator Added Successfully"})
};

const eliminarColaborador = async (req, res) => {
  const project = await Proyecto.findById(req.params.id);

  if (!project) {
    const error = new Error("Project Not Found");
    return res.status(404).json({msg: error.message})
  }

  if (project.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Invalid Action");
    return res.status(404).json({msg: error.message})
  }

  const { email } = req.body;
  const user = await Usuario.findOne({ email }).select(
    "-confirmado -createdAt -password -token -updatedAt -__v "
  );

  if (!user) {
    const error = new Error("User not found");
    return res.status(404).json({ msg: error.message });
  }

  // The collaborator is not the admin of the project
  if(project.creador.toString() === user._id.toString()) {
    const error = new Error("The project creator cannot be a collaborator");
    return res.status(404).json({msg: error.message})
  }

  // Check that it is not already added to the project
  if(project.colaboradores.includes(user._id)) {
    const error = new Error("The user already belongs to the project");
    return res.status(404).json({msg: error.message})
  }

    // Is Ok, can be deleted
    project.colaboradores.pull(req.body.id)
    await project.save()
    res.json({msg: "Collaborator Deleted Successfully"})

};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  searchCollaborator,
  agregarColaborador,
  eliminarColaborador,
};
