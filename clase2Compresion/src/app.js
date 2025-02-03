import express from 'express'
import compression from 'express-compression'

const app = express()


app.use(compression({
    brotli: {enabled: true,zlib: {}},
    threshold: 1024,  // Solo comprimir si el tamaño de la respuesta es mayor a 1 KB
    filter: (req, res) => {
        // Excluir compresión para imágenes y videos
        const extension = req.url.split('.').pop();
        const noCompressTypes = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'webm', 'mov'];
        
        // Si el archivo tiene una extensión que no debe comprimirse, no lo comprime
        return !noCompressTypes.includes(extension);
    }
}));





//app.use(compression({brotli: {enabled: true,zlib: {}}}));
app.get('/', (req, res) => {    
    res.send('Hello World')
})

app.get('/stringlargo', (req, res) => {    
    let string = "hola soy un string largo"
    for (let i = 0; i < 10e5; i++) {
        string += " hola soy un string largo"
    }
    res.send(string)
})

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080')
})