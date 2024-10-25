<script lang="ts">
    import { m } from "$lib";
</script>

<section class="m-20 mb-14 p-1 bg-gradient-to-l from-dark-main-100 to-main-100 rounded-2xl text-dark-main-100 shadow-md">
    <div class="bg-foreground-100 p-12 rounded-xl">
      <table>
        <tbody>
            <tr>
                <td>{m.office_address()}</td>
                <td class="pr-9">خیابان ملل، خیابان طالقانی، کوچه‌ی رضایی، پلاک 10</td>
            </tr>
            <tr>
                <td class="py-5">{m.office_phone_number()}</td>
                <td class="pr-9 py-5">04533789564</td>
            </tr>
            <tr>
                <td>{m.office_postal_code()}</td>
                <td class="pr-9">1563478690</td>
            </tr>
        </tbody>
      </table>
    </div>
</section>
