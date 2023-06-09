import { dateToString } from '../../misc/functions';
import { Expense, EditedExpense } from '../../misc/interfaces';
import { useExpenses } from '../../context/expensesContext';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/authContext';

function IndividualExpense({ _id, company, amount, date, notes }: Expense) {
  const { deleteExpense, editExpense } = useExpenses();
  const { user, serverBaseURL } = useAuth();
  const [editing, setEditing] = useState(false);
  const [editedFields, setEditedFields] = useState<EditedExpense>({
    company: null,
    amount: null,
    date: null,
    notes: null,
  });
  const companyInput = useRef<HTMLTextAreaElement>(null);
  const amountInput = useRef<HTMLInputElement>(null);
  const dateInput = useRef<HTMLInputElement>(null);
  const notesInput = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    notesInput.current!.style.height = notesInput.current!.scrollHeight + 'px';
    companyInput.current!.style.height =
      companyInput.current!.scrollHeight + 'px';
  }, []);

  const deleteHandler = async () => {
    if (!user) {
      return;
    }
    if (window.confirm('Are you sure you wish to delete this entry?')) {
      const response = await fetch(`${serverBaseURL}/api/expenses/${_id}`, {
        method: 'DELETE',
        headers: {
          //prettier-ignore
          'Authorization': `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        deleteExpense(_id);
      }
    } else return;
  };

  const saveEdits = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`${serverBaseURL}/api/expenses/${_id}`, {
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
      <td className='bought-from'>
        <textarea
          ref={companyInput}
          defaultValue={company}
          disabled
          onChange={(e) => updateEditedFields('company', e.target.value)}
        />
      </td>
      <td className='amount'>
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
      <td className='date'>
        <input
          type='date'
          ref={dateInput}
          disabled
          defaultValue={dateToString(date, true)}
          onChange={(e) => updateEditedFields('date', e.target.value)}
        />
      </td>
      <td className='notes'>
        <textarea
          ref={notesInput}
          disabled
          defaultValue={notes}
          onChange={(e) => updateEditedFields('notes', e.target.value)}
        />
      </td>
      <td className='actions'>
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
