const Button = ({ children, onClick, variant = 'primary', disabled = false, className = '' }) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';
  
  const variants = {
    primary: '',
    secondary: '',
    danger: '',
    success: ''
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;