import { useForm } from 'react-hook-form'
import { SButton, SFormContainer, SInput, SLabel } from './components/Form'
import { GlobalStyles } from './styles/globalStyles'
import { zodResolver } from '@hookform/resolvers/zod'
import { TUser, userSchema } from './schemas/users.schema'

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TUser>({
		resolver: zodResolver(userSchema),
	})

	function submit(data: TUser) {
		console.log(data)
	}

	return (
		<>
			<GlobalStyles />
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
