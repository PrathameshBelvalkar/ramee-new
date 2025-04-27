import React, { useState, useEffect } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    FormText,
} from 'reactstrap';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';
import { Eye } from 'lucide-react';
export default function AddTask() {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [type, setType] = useState(null);
    const [dueDate, setDueDate] = useState('');
    const [govtOrg, setGovtOrg] = useState(null);
    const [assignTo, setAssignTo] = useState(null);
    const [file, setFile] = useState(null);
    const [filePath, setFilePath] = useState(null);
    const [loading, setLoading] = useState(false);

    const typeOptions = [
        { value: 'Bug', label: 'Bug' },
        { value: 'Feature', label: 'Feature' },
        { value: 'Improvement', label: 'Improvement' },
    ];

    const govtOrgOptions = [
        { value: 1, label: 'Organization 1' },
        { value: 2, label: 'Organization 2' },
    ];

    const staffOptions = [
        { value: 1, label: 'Staff 1' },
        { value: 2, label: 'Staff 2' },
    ];
    useEffect(() => {
        if (id) {
            fetchTask(id);
        }
    }, [id]);

    const fetchTask = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`);
            const data = await response.json();

            if (data.status) {
                const task = data.data;
                setTitle(task.title);
                setDescription(task.description);
                setPriority(task.priority);
                setType(typeOptions.find(option => option.value === task.type) || null);
                setDueDate(task.due_date);
                setGovtOrg(govtOrgOptions.find(option => option.value === task.govt_organization_id) || null);
                setAssignTo(staffOptions.find(option => option.value === task.assigned_staff_id) || null);
                setFilePath(task.file_path || null);
            } else {
                alert(data.message || 'Failed to fetch task');
            }
        } catch (error) {
            console.error('Error fetching task:', error);
            alert('Failed to fetch task');
        }
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('priority', priority);
        formData.append('type', type?.value);
        formData.append('due_date', dueDate);
        formData.append('govt_organization_id', govtOrg?.value || '');
        formData.append('assigned_staff_id', assignTo?.value || '');
        if (file) {
            formData.append('file', file);
        }

        try {
            const url = id
                ? `http://localhost:8000/api/tasks/update/${id}`
                : `http://localhost:8000/api/tasks/create`;

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || 'Task saved successfully');
                navigate('/');
            } else {
                alert(data.message || 'Failed to save task');
            }
        } catch (error) {
            console.error('Error saving task:', error);
            alert('Failed to save task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
            <Form onSubmit={handleSubmit} className='container'>
                <h3 className='fw-bold mb-4'>{id ? 'Edit Task' : 'Create Task'}</h3>

                <FormGroup>
                    <Label for="title">Title<span style={{ color: 'red' }}> *</span></Label>
                    <Input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="description">Description<span style={{ color: 'red' }}> *</span></Label>
                    <Input
                        id="description"
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </FormGroup>

                <Row form>
                    <Col md={4}>
                        <FormGroup tag="fieldset">
                            <Label>Priority<span style={{ color: 'red' }}> *</span></Label>
                            <div className='d-flex gap-3'>
                                {['Low', 'Medium', 'High'].map(p => (
                                    <FormGroup check key={p}>
                                        <Input
                                            name="priority"
                                            type="radio"
                                            value={p}
                                            checked={priority === p}
                                            onChange={(e) => setPriority(e.target.value)}
                                            required
                                        />
                                        <Label check>{p}</Label>
                                    </FormGroup>
                                ))}
                            </div>
                        </FormGroup>
                    </Col>

                    <Col md={4}>
                        <FormGroup>
                            <Label>Type<span style={{ color: 'red' }}> *</span></Label>
                            <Select
                                options={typeOptions}
                                value={type}
                                onChange={(selectedOption) => setType(selectedOption)}
                                placeholder="-- Select --"
                                required
                            />
                        </FormGroup>
                    </Col>

                    <Col md={4}>
                        <FormGroup>
                            <Label for="dueDate">Due Date<span style={{ color: 'red' }}> *</span></Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Govt. Organization / Entity</Label>
                            <Select
                                options={govtOrgOptions}
                                value={govtOrg}
                                onChange={(selectedOption) => setGovtOrg(selectedOption)}
                                placeholder="-- Select --"
                            />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Label>Assign to Staff</Label>
                            <Select
                                options={staffOptions}
                                value={assignTo}
                                onChange={(selectedOption) => setAssignTo(selectedOption)}
                                placeholder="-- Select --"
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <FormGroup>
                    <Label for="fileUpload">File Upload</Label>
                    <div className="d-flex align-items-center gap-2">
                        <Input
                            id="fileUpload"
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        {filePath && (
                            <Button
                                color="link"
                                onClick={() => window.open(`http://localhost:8000/storage/${filePath}`, '_blank')}
                                style={{ textDecoration: 'none', fontSize: '1.5rem' }}
                            >
                                <Eye />
                            </Button>
                        )}
                    </div>
                    <FormText color="muted">
                        Upload related file if any.
                    </FormText>
                </FormGroup>

                <Button color="primary" type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'SAVE'}
                </Button>

            </Form>
        </div>
    );
}
