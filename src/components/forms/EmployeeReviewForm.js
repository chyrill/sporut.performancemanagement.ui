import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class EmployeeReviewForm extends React.Component{
	state={
		data:{
			Name:'',
			ReviewTemplateId:0,
			Description:'',
			EmployeeId:0,
			SupervisorId:0,
			ReviewDate:''
		},
		loading:false,
		errors:{},
		options:[],
		options2:[]
	};

	onSubmit = () =>{
	const errors =this.validate(this.state.data);
	this.setState({errors});
	if(Object.keys(errors).length==0){
		this.setState({loading:true});
		this.props.submit(this.state.data).catch(err=>{
			this.setState({errors: err.response.data});
			this.setState({loading:false});
		});

	}

	};

componentDidMount(){
  fetch("http://localhost/al.performancemanagement.app/api/users").then((response)=>response.json()).then((findres)=>{

  	this.setState({options:findres.Items})
  
  });
  fetch('http://localhost/al.performancemanagement.app/api/reviewtemplate').then((response)=>response.json()).then((findres)=>{
		
		this.setState({
			options2:findres.Items
		});
	})
}

	validate=data=>{
	const errors={};

	if(data.EmployeeId == data.SupervisorId) errors.SupervisorId = "Employee and Supervisor can not be the same";
	return errors;
	}

	onChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});

	render(){

		const {data,options} = this.state;

		return(
			<div className="ui container">
				<Form onSubmit={this.onSubmit}>
					<Form.Field>
						<label htmlFor="Name"> Name </label>
						<input
							type="text"
							id="Name"
							name="Name"
							placeholder="Name"
							value={data.Name}
							onChange={this.onChange}
						/>
						</Form.Field>
						<Form.Field>
						<label htmlFor="Description"> Description </label>
						<input
							type="text"
							id="Description"
							name="Description"
							placeholder="Description"
							value={data.Description}
							onChange={this.onChange}
						/>
						</Form.Field>
						<Form.Field>
						<label htmlFor="ReviewTemplateId"> Review Template </label>
						<select name="ReviewTemplateId" id="ReviewTemplateId" value={data.ReviewTemplateId} onChange={this.onChange}>
						{this.state.options2.map((data,key)=> <option value={data.Id} key={data.Id}>{data.Name}</option>
				)}
							</select>
							</Form.Field>
						<Form.Field>
						<label htmlFor="EmployeeId"> Employee </label>
						<select name="EmployeeId" id="EmployeeId" value={data.EmployeeId} onChange={this.onChange}>
						{this.state.options.map((data,key)=> <option value={data.Id} key={data.Id}>{data.Name}</option>
				)}
							</select>
						
						</Form.Field>
						<Form.Field>
						<label htmlFor="SupervisorId"> Supervisor </label>
						<select name="SupervisorId" id="SupervisorId" value={data.SupervisorId} onChange={this.onChange}>
						{this.state.options.map((data,key)=> <option value={data.Id} key={data.Id}>{data.Name}</option>
				)}
							</select>
						
						</Form.Field>
						<Form.Field>
						<label htmlFor="ReviewDate"> Date of Review </label>
						<input type="date" name="ReviewDate" value={data.ReviewDate} id="ReviewDate" onChange={this.onChange}/>
						
						</Form.Field>
					<Button primary>Submit</Button>
				</Form>
			</div>
		);
	}
}

EmployeeReviewForm.propTypes={
	submit: PropTypes.func.isRequired
};

export default EmployeeReviewForm;
