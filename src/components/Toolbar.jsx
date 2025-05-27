import BlockButton from "./BlockButton";
import DeleteButton from "./DeleteButton";
import UnblockButton from "./UnblockButton";
import LogoutButton from "./LogoutButton";
export default function Toolbar({ message }) {
  return (
    <div>
      <BlockButton message={message} />
      <UnblockButton />
      <DeleteButton message={message} />
      <LogoutButton />
    </div>
  );
}
