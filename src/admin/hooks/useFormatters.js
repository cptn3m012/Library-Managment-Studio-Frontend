const useFormatters = () => {
    const formatPhoneNumber = (value) => {
        const cleaned = value.replace(/\D+/g, '').substring(0, 9);
        const match = cleaned.match(/(\d{0,3})(\d{0,3})(\d{0,3})/);
        return `${match[1]}${match[2] ? ' ' + match[2] : ''}${match[3] ? ' ' + match[3] : ''}`.trim();
    };

    return {
        formatPhoneNumber
    };
};

export default useFormatters;