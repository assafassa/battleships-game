const Headboard = ({ ships }) => {
    return (
      <div>
        {ships.map((ship) => (
          <img
            key={ship.id}
            src={`${process.env.PUBLIC_URL}/images/ships/${ship.type}/${ship.sunk ? 'sidesunk.png' : 'side.png'}`}
            alt={`Ship ${ship.id}`}
            style={{
              height: '30px',
            }}
          />
        ))}
      </div>
    );
  };
 
export default Headboard;