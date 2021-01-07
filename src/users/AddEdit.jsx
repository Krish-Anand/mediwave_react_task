import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        userId: Yup.number().required('User Id is required'),
        title: Yup.string().required('title is required'),
        body: Yup.string().required('body is required'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(id, data);
    }

    function createUser(data) {
        console.log(data);
        return userService.create(data).then(() => {
            history.push('.');
        })
    }

    function updateUser(id, data) {
        console.log(id, data, 'data');
        return userService.update(id, data).then(() => {
            history.push('..');
        })
    }

    const [user, setUser] = useState({});

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            userService.getById(id).then(user => {
                const fields = ['userId','title', 'body'];
                fields.forEach(field => setValue(field, user[field]));
                setUser(user);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
            <div className="form-row">
            <div className="form-group col-2">
                    <label>User Id</label>
                    <input name="userId" type="text" ref={register} className={`form-control ${errors.userId ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.userId?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Title</label>
                    <input name="title" type="text" ref={register} className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Body</label>
                    <input name="body" type="text" ref={register} className={`form-control ${errors.body ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.body?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                   Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };