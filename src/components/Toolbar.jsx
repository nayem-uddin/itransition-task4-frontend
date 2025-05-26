import BlockButton from "./BlockButton";
import DeleteButton from "./DeleteButton";
import UnblockButton from "./UnblockButton";
import LogoutButton from "./LogoutButton";
export default function Toolbar() {
  return (
    <div>
      <BlockButton />
      <UnblockButton />
      <DeleteButton />
      <LogoutButton />
    </div>
  );
}
