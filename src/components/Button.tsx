interface IButtonProps {
    label: string
}

export default function Button({ label }: IButtonProps) {
    return <button>{ label }</button>
}