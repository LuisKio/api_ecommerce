const templateAccount = `
    <h1> Bienvenido a <span>Ecommerce</span> !</h1>
    <div>
        <p>Estamos muy agradecidos y felices por tu creación de cuenta en ecommerce.mx</p>
        <p>Si tienes alguna duda, no dudes en contactarnos:</p>
        <span>soporte@ecommerce.mx</span>
    </div>
`;

const templatePurchase = `
    <h1> Tu transacción en Ecommerce se realizó correctamente. ¡Gracias! !</h1>
    <div>
        <p>A continuación, podrás ver los detalles de tu transacción junto con un vínculo con las condiciones de la misma. Imprime esta información y guárdala en un lugar seguro como referencia.</p>
    </div>
`;


module.exports = {
    templateAccount,
    templatePurchase
}