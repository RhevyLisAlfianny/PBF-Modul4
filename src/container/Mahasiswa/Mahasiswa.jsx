import React, {Component} from "react";
import './Mahasiswa.css';
import Post from "../../component/Mahasiswa/Mhs";


class Mahasiswa extends Component{
    state ={
        listMahasiswa: [],
        insertMhs: {        // variabel yang digunakan untuk menampung sementara data yang akan di insert
            id:1,
            NIM: "",          // kolom userId, id, title, dan body sama, mengikuti kolom yang ada pada listArtikel.json
            nama: "",
            alamat: "",
            hp: "",
            angkatan:"",
            status:""
        }
    }
    ambiDataDariServerAPI = () =>{
        fetch('http://localhost:3001/mahasiswa')        //alamat URL API yang ingin kita ambil datanya
            .then(response => response.json())      // ubah response data dari URL API menjadi sebuah data json
            .then(jsonHasilAmbilDariAPI => {        // data json hasil ambil dari API kita masukkan ke dalam listArtikel pada state
                this.setState( {
                    listMahasiswa: jsonHasilAmbilDariAPI
                })
            })
    }
    componentDidMount(){
        this.ambiDataDariServerAPI()
    }
    handleHapusMhs = (data) => {
        fetch(`http://localhost:3001/mahasiswa/${data}`,{method:'DELETE'}).then(res => {
            this.ambiDataDariServerAPI()
        })
    }
    handleTambahMhs = (event) => {      // fungsi untuk meng-handle form tambah data artikel
        let formInsertMhs = {...this.state.insertMhs};
        let timestamp = new Date().getTime();
        formInsertMhs['id'] = timestamp;
        formInsertMhs[event.target.name] = event.target.value;
        this.setState({
            insertMhs: formInsertMhs
        })
    }

    handleTombolSimpan = () => {
        fetch('http://localhost:3001/mahasiswa', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.insertMhs)
        }).then( (Response) => {
                this.ambiDataDariServerAPI()
            });
    }

    render(){
        return(
           <div className="post-artikel">
               <div className="form pb-2 border-bottom">
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-1 col-form-label">NIM</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="nim" name="nim" onChange={this.handleTambahMhs}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-1 col-form-label">Nama</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="nama" name="nama" onChange={this.handleTambahMhs}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className=" col-sm-1 col-form-label">Alamat</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="alamat" name="alamat" onChange={this.handleTambahMhs}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-1 col-form-label">No.HP</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="hp" name="hp" onChange={this.handleTambahMhs}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-1 col-form-label">Angkatan</label>
                        <div className="col-sm-2">
                            <input type="text" className="form-control" id="angkatan" name="angkatan" onChange={this.handleTambahMhs}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-1 col-form-label">Status</label>
                        <div className="col-sm-2">
                            <input type="text" className="form-control" id="status" name="status" onChange={this.handleTambahMhs}/>
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div>
               <h2>Daftar Mahasiswa</h2>
               {
                   this.state.listMahasiswa.map(mahasiswa => {
                       return <Post key={mahasiswa.id} nim={mahasiswa.nim} nama={mahasiswa.nama} alamat={mahasiswa.alamat}
                                hp={mahasiswa.hp} angkatan={mahasiswa.angkatan} status={mahasiswa.status} idMhs={mahasiswa.id} 
                                hapusMhs={this.handleHapusMhs}/>
                   })
               }
           </div>
        )
    }
}
export default Mahasiswa;