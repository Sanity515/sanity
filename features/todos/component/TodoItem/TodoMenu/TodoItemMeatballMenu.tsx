import Unpin from "@/components/ui/icon/unpin";
import LineSeparator from "@/components/ui/lineSeparator";
import {
  MenuContainer,
  MenuItem,
  MenuTrigger,
  MenuContent,
} from "@/components/ui/Menu";
import Spinner from "@/components/ui/spinner";
import { useDeleteTodo } from "@/features/todos/api/delete-todo";
import { usePinTodo } from "@/features/todos/api/pin-todo";
import { usePrioritizeTodo } from "@/features/todos/api/prioritize-todo";
import { useTodoForm } from "@/providers/TodoFormProvider";
import Pin from "@/components/ui/icon/pin";
import Edit from "@/components/ui/icon/edit";
import Trash from "@/components/ui/icon/trash";
import { PriorityIndicator } from "../PriorityIndicator";
import Meatball from "@/components/ui/icon/meatball";
import { TodoItemType } from "@/types";

function TodoItemMeatballMenu({
  todo,
  setDisplayForm,
}: {
  todo: TodoItemType;
  setDisplayForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { mutatePrioritize } = usePrioritizeTodo(todo);

  const { deleteMutate, deletePending } = useDeleteTodo();
  const { pinMutate } = usePinTodo(todo);
  return (
    <MenuContainer>
      <MenuTrigger>
        <Meatball className="w-5 h-5" />
      </MenuTrigger>
      <MenuContent>
        <MenuItem onClick={() => pinMutate()}>
          {!todo.pinned ? (
            <Pin className="w-4 h-4" />
          ) : (
            <Unpin className="w-4 h-4" />
          )}
          {todo.pinned ? "unpin" : "Pin to top"}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDisplayForm((prev: boolean) => !prev);
          }}
        >
          <Edit className="w-4 h-4" />
          Edit
        </MenuItem>
        <MenuItem onClick={() => deleteMutate({ id: todo.id })}>
          {deletePending ? (
            <Spinner className="w-4 h-4" />
          ) : (
            <Trash className="w-4 h-4" />
          )}
          delete
        </MenuItem>
        <LineSeparator className="border-card-foreground-muted my-2 w-[95%]" />
        <p className="text-sm text-card-foreground-muted ">priority</p>
        <MenuItem
          className="flex w-full px-2 hover:bg-transparent gap-4 text-xs"
          onClick={() => {}}
        >
          <PriorityIndicator
            level={1}
            onClick={() => {
              mutatePrioritize({ level: "Low" });
            }}
          />
          <PriorityIndicator
            level={2}
            onClick={() => {
              mutatePrioritize({ level: "Medium" });
            }}
          />
          <PriorityIndicator
            level={3}
            onClick={() => {
              mutatePrioritize({ level: "High" });
            }}
          />
        </MenuItem>
      </MenuContent>
    </MenuContainer>
  );
}

export default TodoItemMeatballMenu;
