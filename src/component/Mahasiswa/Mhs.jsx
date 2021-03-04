import React from "react";

const Post = (props) => {
    return(
        <div className="mahasiswa">
            <div className="list-mahasiswa">
                <p className="nama">Nama : {props.nama}</p>
                <p className="nim">Nim :{props.nim}</p>
                <p className="alamat">Alamat : {props.alamat}</p>
                <p className="hp">No HP :{props.hp}</p>
                <p className="angkatan">Angkatan : {props.angkatan}</p>
                <p className="status">Status : {props.status}</p>
                <button className="btn btn-sm btn-warning" onClick={() => props.hapusMhs(props.idMhs)}>Hapus</button>
            </div>
        </div>
    )
}

export default Post;