import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import { SButton, SFormContainer, SInput, SLabel } from './components/Form'
import { GlobalStyles } from './styles/globalStyles'
import { zodResolver } from '@hookform/resolvers/zod'
import { TUser, userSchema } from './schemas/users.schema'
import { api } from './configs/api'
import { ToastContainer, toast } from 'react-toastify'
import { AxiosError } from 'axios'

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TUser>({
		resolver: zodResolver(userSchema),
	})

	async function submit(data: TUser) {
		try {
			await api.post('/users', (data = data))
			reset()
			toast.success('User register with success', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			})
		} catch (error: any) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				})
			}
		}
	}

	return (
		<>
			<GlobalStyles />
			<ToastContainer />
			<SFormContainer>
				<form onSubmit={handleSubmit(submit)}>
					<h3>Cadastro de usuários</h3>
					<h4>Dados pessoais</h4>
					<SLabel>Nome: </SLabel>
					{errors.name && (
						<span style={{ color: 'red' }}>{errors.name.message}</span>
					)}
					<SInput type="text" placeholder="John Doe" {...register('name')} />
					<SLabel>E-mail: </SLabel>
					{errors.email && (
						<span style={{ color: 'red' }}>{errors.email.message}</span>
					)}
					<SInput
						type="text"
						placeholder="john@doe.com.br"
						{...register('email')}
					/>
					<h4>Endereço</h4>
					<SLabel>CEP: </SLabel>
					{errors.address?.zip_code && (
						<span style={{ color: 'red' }}>
							{errors.address?.zip_code.message}
						</span>
					)}
					<SInput
						type="text"
						placeholder="71234567"
						{...register('address.zip_code')}
					/>
					<SLabel>Rua: </SLabel>
					{errors.address?.street && (
						<span style={{ color: 'red' }}>
							{errors.address?.street.message}
						</span>
					)}
					<SInput
						type="text"
						placeholder="Rua ABC"
						{...register('address.street')}
					/>
					<SLabel>Numero: </SLabel>
					{errors.address?.number && (
						<span style={{ color: 'red' }}>
							{errors.address?.number.message}
						</span>
					)}
					<SInput
						type="text"
						placeholder="1234"
						{...register('address.number')}
					/>
					<SLabel>País: </SLabel>
					{errors.address?.country && (
						<span style={{ color: 'red' }}>
							{errors.address?.country.message}
						</span>
					)}
					<SInput
						type="text"
						placeholder="Brasil"
						{...register('address.country')}
					/>
					<SLabel>Cidade: </SLabel>
					{errors.address?.city && (
						<span style={{ color: 'red' }}>{errors.address?.city.message}</span>
					)}
					<SInput
						type="text"
						placeholder="São Paulo"
						{...register('address.city')}
					/>
					<SButton type="submit">Cadastrar</SButton>
				</form>
			</SFormContainer>
		</>
	)
}

export default App
