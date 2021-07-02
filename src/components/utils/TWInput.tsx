import { clsfy } from "../../helpers"
import { useEffect, useState } from "react"

type Rule = (v: string) => boolean | string
enum States {
	Limbo = 'Limbo',
	Focus = 'Focus',
	Valid = 'Valid',
	Default = 'Default',
	Invalid = 'Invalid',
}
interface IProps {
	label?: string,
	hint?: string,
	type?: string,
	value?: string,
	className?: string,
	helpText?: string,
	required?: boolean,
	rules?: Rule[]
}
const TWInput: React.FC<IProps> = ({ className = '', rules = [], ...props }) => {

	const [state, setState] = useState(States.Default)
	const [value, setValue] = useState(props.value || '')
	const [id] = useState(Math.random().toString(36).slice(2))
	const [hint] = useState(props.hint || 'Type text here')
	const [label, setLabel] = useState<string>(props.label || States.Default)
	const [helpText, setHelpText] = useState<string>(props.helpText || 'Modify the data in this field.')

	// Methods
	const handleOnFocus = () => {
		if (!props.label && state === States.Default) {
			setLabel(States.Focus)
			setState(States.Focus)
		}
	}
	const handleOnBlur = () => {
		if (!props.label && state === States.Focus) {
			setState(States.Default)
			setLabel(States.Default)
		}
	}
	const handleSetLabel = (pState?: States) => {
		setLabel(props.label ? props.label : pState || States.Default)
	}
	const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const mRules = props.required ? [(v: string) => !!v || 'Field is required.', ...rules] : rules
		let evals = mRules.map(rule => rule(value))

		if (!value && !props.required) {
			setState(States.Default)
			setHelpText(props.helpText || 'Modify the data in this field.')
			handleSetLabel()
		}
		else if (evals.every(evl => evl === true)) {
			setState(States.Valid)
			setHelpText('This data is valid')
			handleSetLabel(States.Valid)
		}
		else {
			setState(States.Invalid)
			let errorMessage = evals.find(evl => typeof evl === 'string' && evl) as string | undefined
			setHelpText(errorMessage || 'This data is valid')
			handleSetLabel(States.Invalid)
		}
		setValue(value)
	}

	// Effects
	useEffect(() => {
		props.value && setValue(props.value)
	}, [props.value])

	// Computed
	const error = state === States.Invalid
	const success = state === States.Valid
	const focused = state === States.Focus
	const limbo = state === States.Limbo
	const initial = state === States.Default

	return (
		<div className={className}>
			<label
				htmlFor={id}
				className={clsfy('text-sm mb-1 block font-bold ml-1', {
					'text-red-500': error,
					'text-blue-500': limbo,
					'text-green-500': success,
					'text-gray-700': focused,
					'text-gray-500': initial
				})}
			>
				{label}
			</label>
			<div className={clsfy("relative rounded border overflow-hidden flex", {
				'border-red-500': error,
				'border-blue-500': limbo,
				'border-green-500': success,
				'border-gray-500': focused,
				'border-gray-300': initial
			})}>
				<div className={clsfy('w-14 grid text-white place-items-center flex-none', {
					'bg-gray-300': focused,
					'bg-gray-100': initial,
					'bg-green-500': success,
					'bg-red-500': error,
					'bg-blue-500': limbo,
				})}>
					{(initial || focused) && (<div className='h-4 w-4 bg-white rounded-full' />)}
					{(error || success || limbo) && (
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							{success && <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />}
							{error && <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />}
							{limbo && <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />}
						</svg>
					)}
				</div>
				<input
					id={id}
					value={value}
					placeholder={hint}
					onBlur={handleOnBlur}
					type={props.type || 'text'}
					onChange={handleOnInput}
					onFocus={handleOnFocus}
					className='text-base bg-transparent text-gray-700 w-full h-12 px-3 focus:outline-none'
				/>
				<div className='w-16 h-12 absolute right-0 inset-y-0 bg-gradient-to-l from-white to-transparent'>

				</div>
			</div>
			<div
				className={clsfy('px-1 mt-1 text-sm', {
					'text-red-500': error,
					'text-blue-500': limbo,
					'text-green-500': success,
					'text-gray-600': focused,
					'text-gray-400': initial
				})}
			>
				{helpText}
			</div>
		</div >
	)
}

export default TWInput