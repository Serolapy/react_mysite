import { Link } from 'react-router-dom';

//оболочка
export function Ul(props){
	return (
		<div className="list-ul">
			{props.children}
		</div>
	)
}

//элементы внутри оболочки
export function Li(props){
	return (
		<div className="list-li">
			<Link to={props.href}>{props.link}</Link><br />
			{props.children}
		</div>
	)
}