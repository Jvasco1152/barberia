const body = document.body;
let inputFile, imgFoto;
const hv = document.querySelector("#hv");
const cloudPreset = 'o1oqj8ty';
const cloudUrl = '	https://api.cloudinary.com/v1_1/dcqtku20h/upload';
inputFile = document.querySelector('input');
imgFoto = document.querySelector('#foto');



const subirImagen = async(archivoSubir) => {
    const formData= new FormData();
    formData.append('upload_preset', cloudPreset);
    formData.append('file', archivoSubir);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });
        if (resp.ok){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else{
            throw await resp.json();

        }
        
    } catch (err) {
        throw err;
        
    };

}

const eventos = () =>{
    inputFile.addEventListener('change',(event)=>{
        const file = event.target.files[0];
        subirImagen(file).then( url => imgFoto.src = url);
        
    });
}

const init = ()=>{
    subirImagen();
}
eventos();
