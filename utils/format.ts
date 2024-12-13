export const positionFormat = (position: string) => {
    const positionCodeToLabel: {
        [key: string]: string
    } = {
        'standing': 'Em pé',
        'takedown': 'Queda',
        'open_guard': 'Guarda aberta',
        'half_guard': 'Meia guarda',
        'closed_guard': 'Guarda fechada',
        '5050_guard': 'Guarda 5050',
        'side_control': 'Controle lateral',
        'mount': 'Montada',
        'back': 'Costas',
        'turtle': 'Tartaruga'
    }

    return positionCodeToLabel[position] || 'Desconhecido'
}