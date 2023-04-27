import { dateToString } from '../../misc/functions';
import { Expense, EditedExpense } from '../../misc/interfaces';
import { useExpenses } from '../../context/expensesContext';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/authContext';

function IndividualExpense({ _id, company, amount, date, notes }: Expense) {
  const { deleteExpense, editExpense } = useExpenses();
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [editedFields, setEditedFields] = useState<EditedExpense>({
    company: null,
    amount: null,
    date: null,
    notes: null,
  });
  const companyInput = useRef<HTMLInputElement>(null);
  const amountInput = useRef<HTMLInputElement>(null);
  const dateInput = useRef<HTMLInputElement>(null);
  const notesInput = useRef<HTMLTextAreaElement>(null);

  console.log(editedFields);

  useEffect(() => {
    notesInput.current!.style.height = notesInput.current!.scrollHeight + 'px';
  }, []);

  const deleteHandler = async () => {
    if (!user) {
      return;
    }
    if (window.confirm('Are you sure you wish to delete this entry?')) {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${_id}`,
        {
          method: 'DELETE',
          headers: {
            //prettier-ignore
            'Authorization': `Bearer ${user.token}`,
          },
        }
      );
      if (response.ok) {
        deleteExpense(_id);
      }
    } else return;
  };

  const saveEdits = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`http://localhost:5000/api/expenses/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        //prettier-ignore
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(editedFields),
    });
    if (response.ok) {
      const json = await response.json();
      notesInput.current!.style.height =
        notesInput.current!.scrollHeight + 5 + 'px';
      companyInput.current!.disabled = true;
      amountInput.current!.disabled = true;
      dateInput.current!.disabled = true;
      notesInput.current!.disabled = true;
      setEditedFields({ company: null, amount: null, date: null, notes: null });
      setEditing(false);
    }
  };

  const updateEditedFields = (field: string, value: string) => {
    if (field == 'company') {
      setEditedFields((prev) => {
        return { ...prev, company: value };
      });
    }
    if (field == 'amount') {
      setEditedFields((prev) => {
        return { ...prev, amount: value };
      });
    }
    if (field == 'date') {
      setEditedFields((prev) => {
        return { ...prev, date: new Date(value) };
      });
    }
    if (field == 'notes') {
      setEditedFields((prev) => {
        return { ...prev, notes: value };
      });
    }
  };

  const enableEditing = () => {
    setEditing(true);
    companyInput.current!.disabled = false;
    amountInput.current!.disabled = false;
    dateInput.current!.disabled = false;
    notesInput.current!.disabled = false;
  };

  const disableEditing = () => {
    notesInput.current!.style.height =
      notesInput.current!.scrollHeight + 5 + 'px';
    setEditing(false);

    companyInput.current!.value = company;
    amountInput.current!.value = amount;
    dateInput.current!.value = dateToString(date, true);
    notesInput.current!.value = notes;

    companyInput.current!.disabled = true;
    amountInput.current!.disabled = true;
    dateInput.current!.disabled = true;
    notesInput.current!.disabled = true;
    setEditedFields({ company: null, amount: null, date: null, notes: null });
  };

  return (
    <tr>
      <td>
        <input
          type='text'
          ref={companyInput}
          defaultValue={company}
          disabled
          onChange={(e) => updateEditedFields('company', e.target.value)}
        />
      </td>
      <td>
        £
        <input
          className='amount-input'
          type='number'
          ref={amountInput}
          defaultValue={amount}
          disabled
          onChange={(e) => updateEditedFields('amount', e.target.value)}
        />
      </td>
      <td>
        <input
          type='date'
          ref={dateInput}
          disabled
          defaultValue={dateToString(date, true)}
          onChange={(e) => updateEditedFields('date', e.target.value)}
        />
      </td>
      <td>
        <textarea
          ref={notesInput}
          disabled
          defaultValue={notes}
          onChange={(e) => updateEditedFields('notes', e.target.value)}
        />
      </td>
      <td>
        {editing ? (
          <>
            <button className='btn-table btn-save' onClick={saveEdits}>
              Save
            </button>
            <button className='btn-table btn-cancel' onClick={disableEditing}>
              Cancel
            </button>
          </>
        ) : (
          <button className='btn-table btn-edit' onClick={enableEditing}>
            Edit
          </button>
        )}
        <button className='btn-table btn-delete' onClick={deleteHandler}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default IndividualExpense;
