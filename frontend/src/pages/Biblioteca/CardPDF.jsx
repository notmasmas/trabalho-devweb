import logoIFSC from '../../assets/img/logo.svg';
import './CardPDF.css'

export function CardPDF({ cardID, cardTitle, cardDescription }) {

    function downloadPDF() {
        const url = `http://localhost:3000/api/v1/files/download/${cardID}`;
        window.open(url, '_blank');
    }

    return (
        <div className="col">
            <div className="card h-100 card-horizontal">

                <img 
                    src={logoIFSC} 
                    className="card-img-left" 
                    alt="logo"/>

                <div className="card-body">
                    <h5 className="card-title">{cardTitle}</h5>
                    <p className="card-text">{cardDescription}</p>

                    <button 
                        className="btn btn-primary"
                        onClick={downloadPDF}>
                        Download
                    </button>
                </div>

            </div>
        </div>
    )
}