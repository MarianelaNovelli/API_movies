//Paginador 
let pagina = 1; 

//Accedo a los botones para añadirles un evento a cada uno
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

//Al hacer click en alguno de los botones, cambio de pagina
btnSiguiente.addEventListener('click', () => {
    if(pagina < 1000){
        pagina = pagina + 1;
        cargarPeliculas();
    }   
})

btnAnterior.addEventListener('click', () => {
    if(pagina > 1){
        pagina = pagina - 1;
        cargarPeliculas();
    }   
})

//creo una funcion flecha para conectarse a la API y cargar las peliculas en mi contenedor HTML 

const cargarPeliculas = async() => {
    //conexion a la API
    try{
        //Ejemplo de peticion
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=8ab2fcc9270be30d6a87cb0172391059&page=${pagina}`);

        //La respuesta llega en formato JSON
        console.log(respuesta);

        if(respuesta.status === 200){
            //Accedo a la informacion de la respuesta
            const datos = await respuesta.json();

            //Muestro los datos obtenidos
            let peliculas = '';

            datos.results.forEach(pelicula => {
                peliculas = peliculas + 
                `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>
                `;
            });

            //Accedo al contenedor HTML
            document.getElementById('contenedor').innerHTML = peliculas;

        } else if(respuesta.status === 404){
            console.log('La película que buscas no existe.')
        } else{
            console.log('Ha ocurrido un error desconocido.')
        }

    } catch(error){
        console.log(error);
    }   
}

cargarPeliculas();