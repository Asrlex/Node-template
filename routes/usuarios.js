const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuarios");
const AsyncWrapper = require("../utils/AsyncWrapper");
const {verifyAdmin, verifyLogin, verifyUsuario, noDobleLogin} = require("../middleware");


router.route("/login")
    .get(noDobleLogin, controller.mostrarLogin)
    .post(AsyncWrapper(controller.iniciarSesion));

router.get("/logout", verifyLogin, controller.cerrarSesion);

router.route("/")
    .get([verifyLogin, verifyAdmin], AsyncWrapper(controller.mostrarTodosUsuarios))
    .post([verifyLogin, verifyAdmin], AsyncWrapper(controller.crearUsuario));

router.get("/miUsuario", verifyLogin, AsyncWrapper(controller.mostrarMiUsuario));

router.route("/:id")
    .get([verifyLogin, verifyUsuario], AsyncWrapper(controller.mostrarUsuario))
    .patch([verifyLogin, verifyUsuario], AsyncWrapper(controller.actualizarInfoUsuario))
    .delete([verifyLogin, verifyAdmin], AsyncWrapper(controller.borrarUsuario));

module.exports = router;