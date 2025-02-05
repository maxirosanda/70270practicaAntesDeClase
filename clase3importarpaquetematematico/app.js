import express from "express";
import {suma, resta, multiplicacion, division} from 'clase3-mi-paquete-matematico2'

const app = express();
const PORT = 3000;

// Ruta para la suma (ejemplo: /suma/5/3)
app.get("/suma/:a/:b", (req, res) => {
    const { a, b } = req.params;
    res.json({ resultado: suma(Number(a), Number(b)) });
});

// Ruta para la resta (ejemplo: /resta/10/4)
app.get("/resta/:a/:b", (req, res) => {
    const { a, b } = req.params;
    res.json({ resultado: resta(Number(a), Number(b)) });
});

// Ruta para la multiplicación (ejemplo: /multiplicacion/6/7)
app.get("/multiplicacion/:a/:b", (req, res) => {
    const { a, b } = req.params;
    res.json({ resultado: multiplicacion(Number(a), Number(b)) });
});

// Ruta para la división (ejemplo: /division/10/2)
app.get("/division/:a/:b", (req, res) => {
    try {
        const { a, b } = req.params;
        res.json({ resultado: division(Number(a), Number(b)) });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


