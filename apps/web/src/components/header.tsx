const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <div>
      <h1 className="text-2xl font-medium">{title}</h1>
      <p className="text-muted-foreground mb-6">{subtitle}</p>
    </div>
  );
};

export default Header;
