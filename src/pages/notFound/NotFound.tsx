import { routePaths } from "@/utils/utilities"
import { Link } from "react-router-dom"
import './notFound.css';
import { Button } from "@nextui-org/react";

export const NotFound = () => {
    return (
        <section className='not-found-page container'>
            <div className="site">
                <div className="sketch">
                    <div className="bee-sketch red"></div>
                    <div className="bee-sketch blue"></div>
                </div>

                <h1>
                    404:
                    <small>Page Not Found</small>
                </h1>

                <Button variant="bordered" >
                    <Link to={routePaths.index} className="text-sky-500 underline"> Volver al Inicio</Link>
                </Button>

            </div>
        </section>
    )
}
