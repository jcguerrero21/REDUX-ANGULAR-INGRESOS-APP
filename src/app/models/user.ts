export class User {

    public nombre: string;
    public email: string;
    public uid: string;
    
    constructor(usuario: UsuarioObj) {
        this.nombre = usuario && usuario.nombre || null;
        this.uid = usuario && usuario.uid || null;
        this.email = usuario && usuario.email || null;
    }

}

interface UsuarioObj {
    uid: string;
    email: string;
    nombre: string;
}
