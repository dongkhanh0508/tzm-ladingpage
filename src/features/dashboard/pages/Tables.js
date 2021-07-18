import StatusCard from 'components-templates/dashboard/StatusCard';
import TableCard from 'components-templates/dashboard/TableCard';
import Modal from '@material-tailwind/react/Modal';
import ModalHeader from '@material-tailwind/react/ModalHeader';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import Button from '@material-tailwind/react/Button';
import { useState } from 'react';
import GeoSearchExample from 'components/map/GeoSearchExample';
//import MapPicker from 'components/map/MapPicker';

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const handleClick = (action) => {
    setShowModal(action);
  };
  return (
    <>
      <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            <StatusCard
              color="pink"
              icon="trending_up"
              title="Traffic"
              amount="350,897"
              percentage="3.48"
              percentageIcon="arrow_upward"
              percentageColor="green"
              date="Since last month"
            />
            <StatusCard
              color="orange"
              icon="groups"
              title="New Users"
              amount="2,356"
              percentage="3.48"
              percentageIcon="arrow_downward"
              percentageColor="red"
              date="Since last week"
            />
            <StatusCard
              color="purple"
              icon="paid"
              title="Sales"
              amount="924"
              percentage="1.10"
              percentageIcon="arrow_downward"
              percentageColor="orange"
              date="Since yesterday"
            />
            <StatusCard
              color="blue"
              icon="poll"
              title="Performance"
              amount="49,65%"
              percentage="12"
              percentageIcon="arrow_upward"
              percentageColor="green"
              date="Since last month"
            />
          </div>
        </div>
      </div>

      <div className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 mb-16">
            <TableCard />
          </div>
        </div>
      </div>
      <Button color="lightBlue" type="button" onClick={() => handleClick(true)} ripple="light">
        Open regular Modal
      </Button>
      <Modal size="regular" active={showModal} toggler={() => handleClick(false)}>
        <ModalHeader toggler={() => handleClick(false)}>Modal Title</ModalHeader>
        <ModalBody>
          <GeoSearchExample />
        </ModalBody>
        <ModalFooter>
          <Button color="red" buttonType="link" onClick={() => handleClick(false)} ripple="dark">
            Close
          </Button>

          <Button color="green" onClick={() => handleClick(false)} ripple="light">
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
