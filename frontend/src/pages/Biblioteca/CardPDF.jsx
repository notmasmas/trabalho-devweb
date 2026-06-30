import logoIFSC from '../../assets/img/logo.svg';
import './CardPDF.css';

export function CardPDF({ cardID, cardTitle, cardDescription }) {

    function downloadPDF() {
        const url = `https://trabalho-devweb-production.up.railway.app/api/v1/files/download/${cardID}`;
        window.open(url, "_blank");
    }

    return (
        <div className="card pdf-card">

            <img
                src={logoIFSC}
                alt="PDF"
                className="pdf-card-image"
            />

            <div className="card-body pdf-card-body">

                <div className="pdf-card-content">
                    <h5 className="card-title">{cardTitle}</h5>

                    <p>{cardDescription}</p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={downloadPDF}>
                    <i className="bi bi-download"></i> Download
                </button>

            </div>

        </div>
    );
}